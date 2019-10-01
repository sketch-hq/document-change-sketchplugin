const sketch = require("sketch");

function onDocumentChanged(context) {
  var changes = context.actionContext;
  for (i = 0; i < changes.length; i++) {
    var change = changes[i];
    var path = change.fullPath();
    var type = change.type();

    switch (type) {
      case 1: // Property change
        sketch.UI.message(`Property changed at ${path}`);
        break;

      case 2: // Deletion
        // Objects that got moved in the tree are both deleted from the tree
        // and re-added.
        if (change.isMove()) break;

        sketch.UI.message(`Object deleted at ${path}`);
        break;

      case 3: // Addition
        if (change.isMove()) {
          sketch.UI.message(
            `Object moved from ${change
              .associatedChange()
              .fullPath()} to ${path}`
          );
        } else {
          sketch.UI.message(`New object inserted at ${path}`);
        }
        break;

      default:
        sketch.UI.message(`⚠️ Unexpected change type ${type}`);
    }
  }
}
