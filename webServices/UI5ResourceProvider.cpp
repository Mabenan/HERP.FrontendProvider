/*
 * UI5ResourceProvider.cpp
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#include <webServices/UI5ResourceProvider.h>

QString UI5ResourceProvider::getName() const {
	return "ui5ResourceProvider";
}

QString UI5ResourceProvider::getRoute(ApplicationServerInterface *app) {
	return "/resources/.*";
}

QHttpServerResponse UI5ResourceProvider::execute(
		const QHttpServerRequest *request, ApplicationServerInterface *app) {
	QString requestedFile = request->url().path();
	requestedFile = requestedFile.remove(0,1);
	qDebug() << requestedFile;
	QDir currentDir = QDir(QCoreApplication::applicationDirPath());
	currentDir.cd("frontend");
	return QHttpServerResponse::fromFile(currentDir.absoluteFilePath(requestedFile));
}
