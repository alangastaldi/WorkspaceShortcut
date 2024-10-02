const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.changeWorkspace', ChangeWorkspace));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.configFolders', ConfigFolders));
	
	
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange1', () => OpenFolder(0)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange2', () => OpenFolder(1)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange3', () => OpenFolder(2)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange4', () => OpenFolder(3)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange5', () => OpenFolder(4)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange6', () => OpenFolder(5)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange7', () => OpenFolder(6)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange8', () => OpenFolder(7)));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-shortcut.fastChange9', () => OpenFolder(8)));
}

function ChangeWorkspace () {
	const config = loadConfiguration();
	const pickConfig = {
		matchOnDescription: true,
		placeHolder: 'Choose the workspace.'
	};

	if (typeof config !== 'undefined') vscode.window.showQuickPick(ListFolders(), pickConfig).then(choice => OpenFolder(choice?.id));
}

function ConfigFolders() {
	vscode.commands.executeCommand('workbench.action.openSettings', 'workspace-shortcut.folders');
}

function FastChange(index) {
	const config = loadConfiguration();
	const pickConfig = {
		matchOnDescription: true,
		placeHolder: 'Choose the workspace.'
	};

	if (typeof config !== 'undefined') OpenFolder(choice?.id);
}

function loadConfiguration() {
	const config = vscode.workspace.getConfiguration('workspace-shortcut');
	if (!config.folders || config.folders.length == 0) {
		vscode.window.showErrorMessage("You need to define the folders in the extension settings.", "Open Configurations").then(
			function(resp) {
				if (resp === "Open Configurations") vscode.commands.executeCommand('workbench.action.openSettings', 'workspace-shortcut.folders');
			}
		);
		return undefined;
	}

	return config;
}

function ListFolders() {
	const config = loadConfiguration();
	return config.folders.map((f, i) => {
		return {
			"label": (i + 1) + ": " + f.split("\\").at(-1),
			"description": f,
			"id": i
		}
	});
}

function OpenFolder(index) {
	if (typeof index !== 'number') return;

	const config = loadConfiguration();
	if (typeof config !== 'undefined' && typeof config.folders[index] !== 'undefined') vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(config.folders[index]));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
