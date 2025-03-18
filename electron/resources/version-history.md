## Release Overview 2.1.1

### Features

- **Variables**
  - Variables can now be defined as **secret**.
  - Variable details are displayed when hovering over a used variable.
  - Variables can also be used as **secret** values.
  - When entering a variable with `{{`, a popup appears with available variables.

- **Collection Management**:
  - Added drag-and-drop reordering for the `CollectionTree`.

- **Developer Enhancements**:
  - Introduced a Developer Menu with reload and relaunch options.
  - Enhanced shortcut detection.

- **SQL Client Improvements**:
  - Enhanced `DetailView` to support multiple languages.
  - Added persistence for database changes, a paginator, and a feature to run selected queries.

- **User Interface and Interaction**:
  - Implemented drag-and-drop functionality for `DynamicTabView` tabs.
  - Enhanced `LabelComponent` with a default label.
  - Added tab closure support from the model in `DynamicTabView`.

- **Shortcut and Event Management**:
  - Improved shortcut settings and introduced a decorator for defining shortcuts.
  - Updated event detection to avoid conflicts with Monaco's predefined events.

- **API Client Enhancements**:
  - Added support for different HTTP/S agents, localhost handling
  - Added response headers and cookies tab.

- **Monaco Editor**:
  - Imporved filtering to allow filtering sql, graphql, json, xml
  - Added formmating for various languages 

### Fixes and Refactoring

- **General Cleanups and Refactoring**:
  - Various cleanups across components, including `TableEditor`, `SaveStateDirective`, and `VariableInputComponent`.
  - Refactored `MonacoEditor` and `DynamicTabView` to improve service-based management and modularity.

- **Shortcuts and Key Handling**:
  - Added missing keys and enhanced functionality in shortcuts.
  - Improved key type management for better control.

- **Component-Based Refactors**:
  - Moved functions like `fireTabChanged` to services for `WorkspacesService` and `DynamicTabView`.

- **Bug Fixes**:
  - Resolved permissions and save-state issues in `TableEditor`.
  - Addressed minor bugs in `MonacoEditor` and `CollectionTree`.

This update brings extensive improvements to user interface components, shortcut handling, and backend functionality for SQL and API clients, alongside focused component refinements and modularization for enhanced performance and maintainability.


## Release Overview 2.1.0

### **User-Focused Summary**

variables can now be defined as secret
Hotkeys implemented
- **New Features:**
  - **Enhanced Filtering:** Improved filtering capabilities, now supporting additional criteria (`ad94d1a`).

- **Important Fixes:**
  - **Resource Path Handling:** Fixed issues with correctly locating resource paths (`70884a9`).
  - **Workspace Management:** Resolved issues related to deleting user workspaces (`fd072f7`).
  - **User Interface Updates:** Addressed bugs in handling unselected items and saving state in various components (`cec169b`, `2b047e3`).
  - **App Stability:** Fixed exceptions and ensured configurations are initialized properly (`9509e46`, `7c1daa2`).

- **Improvements:**
  - **Resource Organization:** Updated and reorganized resources for better management (`e16520b`, `b2b519d`).

## Release Overview 2.0.1

### **User-Focused Summary**

- **New Features:**
  - **Enhanced Filtering:** Improved filtering capabilities, now supporting additional criteria (`ad94d1a`).

- **Important Fixes:**
  - **Resource Path Handling:** Fixed issues with correctly locating resource paths (`70884a9`).
  - **Workspace Management:** Resolved issues related to deleting user workspaces (`fd072f7`).
  - **User Interface Updates:** Addressed bugs in handling unselected items and saving state in various components (`cec169b`, `2b047e3`).
  - **App Stability:** Fixed exceptions and ensured configurations are initialized properly (`9509e46`, `7c1daa2`).

- **Improvements:**
  - **Resource Organization:** Updated and reorganized resources for better management (`e16520b`, `b2b519d`).

## Release Overview 2.0.0

### **Features**

- **Manage Relations:** Users can now share collections, collection items, teams, and workspaces. Additionally, users can add others to a team.
- **Language Detection:** Automatic detection of the response language from the Content-Type header and formatting of documents accordingly.
- **Enhanced Response Filter:** The response filter functionality has been upgraded with new options:
  - **Regex Support:** Use regular expressions for filtering.
  - **Case Sensitivity:** Option to enable or disable case sensitivity in filtering.
  - **Node Filtering:** Choose to filter based on the inner node of a found property and/or its children.
- **Translation Module:** Support has been added for multiple languages, enabling a more localized user experience.
- **Settings Page:** Introduction of a new settings page to manage various user settings.
- **Change Detection:** New feature to detect external changes to entities. Affected users will be notified and can either reload their working set manually or have it reloaded automatically. If a user has unsaved changes and an external change is detected, they must merge the changes before saving.
- **Login Form Enhancements:** Added auto-login process and progress indicator to improve user experience during login.
- **General Enhancements:** Various new features and improvements have been implemented to enhance overall functionality and user experience.

### **Fixes**

- **eb4a75a:** Support for multiple sources in the SseService has been added, improving flexibility and functionality.
- **886dc8f:** Comments are now removed from the request body before sending, ensuring cleaner requests.
- **bff7d16:** Resolved various theme-related issues to improve consistency and appearance.
- **Security:** Enhanced security measures by avoiding the logging of sensitive data, ensuring better protection of user information.

### **Known Limitations**

- **Change Detection:** Currently, it is not possible to directly compare source changes with external changes. Users will need to manually merge changes if discrepancies are detected.