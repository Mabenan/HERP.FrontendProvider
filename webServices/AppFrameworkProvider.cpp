/*
 * AppFrameworkProvider.cpp
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#include <webServices/AppFrameworkProvider.h>

QString AppFrameworkProvider::getName() const {
	return "appFrameworkProvider";
}

QString AppFrameworkProvider::getRoute(ApplicationServerInterface *app) {
	return "/(index.html|$|controller\/.*|view\/.*|formatter\/.*|[^\/]*$)";
}

QHttpServerResponse AppFrameworkProvider::execute(
		const QHttpServerRequest *request, ApplicationServerInterface *app) {
	qDebug() << "AppFramework";
	QString requestedFile = request->url().path();
	requestedFile = requestedFile.remove(0,1);
	qDebug() << requestedFile;
	QDir currentDir = QDir(QCoreApplication::applicationDirPath());
	currentDir.cd("frontend");
	if(requestedFile.isEmpty())
	{
		requestedFile = "index.html";
	}
	return QHttpServerResponse::fromFile(currentDir.absoluteFilePath(requestedFile));
}
