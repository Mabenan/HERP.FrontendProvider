/*
 * AppFrameworkProvider.cpp
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#include <webServices/AppFrameworkProvider.h>
#include <data/AppRoute.h>

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
	if(requestedFile == "manifest.json"){
	    QFile jsonFile(currentDir.absoluteFilePath(requestedFile));
	    jsonFile.open(QFile::ReadOnly);
		QJsonDocument manifest = QJsonDocument::fromJson(jsonFile.readAll());
		QJsonArray routes = QJsonArray();
		QJsonObject targets = QJsonObject();
		QList<QObject *> routeObjects = app->getValues("APP_FRONTEND_ROUTES");
		for(QObject * routeObject : routeObjects){
			AppRoute * appRoute = static_cast<AppRoute *>(routeObject);
			QJsonObject jsonRoute();
			jsonRoute["pattern"] = appRoute->viewKey;
			jsonRoute["name"] = appRoute->viewKey;
			jsonRoute["target"] = appRoute->viewKey;
			QJsonObject appRouteTarget = QJsonObject();
			appRouteTarget["viewName"] = appRoute->viewKey;
			appRouteTarget["viewLevel"] = 1;
			targets[appRoute->viewKey] = appRouteTarget;
			routes.append(jsonRoute);
		}
		manifest["routing"]["routes"] = routes;
		manifest["routing"]["targets"] = targets;
		return manifest;
	}else{
	return QHttpServerResponse::fromFile(currentDir.absoluteFilePath(requestedFile));
	}
}
