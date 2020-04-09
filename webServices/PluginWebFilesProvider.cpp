/*
 * PluginWebFilesProvider.cpp
 *
 *  Created on: 31.03.2020
 *      Author: drichte
 */

#include <webServices/PluginWebFilesProvider.h>
#include <data/PluginFolder.h>

PluginWebFilesProvider::~PluginWebFilesProvider() {
	// TODO Auto-generated destructor stub
}

QString PluginWebFilesProvider::getName() const {
	return "PluginWebFilesProvider";
}

QString PluginWebFilesProvider::getRoute(ApplicationServerInterface *app) {
	QList<QObject*> pluginFolders = app->getValues("PLUGIN_FOLDERS");
	QString pluginFoldersString;
	bool first = true;
	for (QObject *pluginFolderGeneric : pluginFolders) {
		PluginFolder *pluginFolder =
				static_cast<PluginFolder*>(pluginFolderGeneric);
		if (!first) {
			pluginFoldersString = pluginFoldersString + "|"
					+ pluginFolder->folder;
		} else {
			pluginFoldersString = pluginFolder->folder;
		}
		first = false;
	}
	QString route = "\/(" + pluginFoldersString
			+ ")\/(controller|view|control|library|formatter)\/.*";
	return route;
}

QHttpServerResponse PluginWebFilesProvider::execute(
		const QHttpServerRequest *request, ApplicationServerInterface *app) {
	qDebug() << "PluginWebFilesProvider";
	QString requestedFile = request->url().path();
	requestedFile = requestedFile.remove(0, 1);
	qDebug() << requestedFile;
	QDir currentDir = QDir(QCoreApplication::applicationDirPath());
	currentDir.cd("frontend");
	currentDir.cd("plugins");
	if (requestedFile.contains("..")) {
		return QHttpServerResponse(
				QHttpServerResponse::StatusCode::BadRequest);
	} else {
		return QHttpServerResponse::fromFile(
				currentDir.absoluteFilePath(requestedFile));
	}
}
