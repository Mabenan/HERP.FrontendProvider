/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.QuickViewGroup
sap.ui.define([
		'./library', 'sap/ui/core/Element'],
	function(library, Element) {
		"use strict";

		/**
		* Constructor for a new QuickViewGroup.
		*
		* @param {string} [sId] ID for the new control, generated automatically if no ID is given
		* @param {object} [mSettings] Initial settings for the new control
		*
		* @class QuickViewGroup consists of a title (optional) and an entity of group elements.
		*
		* @extends sap.ui.core.Element
		*
		* @author SAP SE
		* @version 1.75.0
		*
		* @constructor
		* @public
		* @since 1.28.11
		* @alias sap.m.QuickViewGroup
		* @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		*/
		var Group = Element.extend("sap.m.QuickViewGroup", /** @lends sap.m.QuickViewGroup.prototype */ {
				metadata: {

					library: "sap.m",
					properties: {

						/**
						 * Determines whether the group is visible on the screen.
						 */
						visible : {
							type: "boolean",
							group : "Appearance",
							defaultValue: true
						},

						/**
						 * The title of the group
						 */
						heading: {
							type: "string",
							group: "Misc",
							defaultValue: ""
						}
					},
					defaultAggregation: "elements",
					aggregations: {

						/**
						 * A combination of one label and another control (Link or Text) associated to this label.
						 */
						elements: {
							type: "sap.m.QuickViewGroupElement",
							multiple: true,
							singularName: "element",
							bindable: "bindable"
						}
					}
				}
			});


		["setModel", "bindAggregation", "setAggregation", "insertAggregation", "addAggregation",
			"removeAggregation", "removeAllAggregation", "destroyAggregation"].forEach(function (sFuncName) {
				Group.prototype["_" + sFuncName + "Old"] = Group.prototype[sFuncName];
				Group.prototype[sFuncName] = function () {
					var result = Group.prototype["_" + sFuncName + "Old"].apply(this, arguments);

					var oPage = this.getParent();
					if (oPage) {
						oPage._updatePage();
					}

					if (["removeAggregation", "removeAllAggregation"].indexOf(sFuncName) !== -1) {
						return result;
					}

					return this;
				};
			});

		Group.prototype.setProperty = function (sName, oValue) {
			var oQuickView = this.getQuickViewBase(),
				bSuppressInvalidate = false;

			if (oQuickView && oQuickView.isA("sap.m.QuickView")) {
				bSuppressInvalidate = true;
			}

			Element.prototype.setProperty.call(this, sName, oValue, bSuppressInvalidate);

			var oPage = this.getParent();
			if (oPage) {
				oPage._updatePage();
			}

			return this;
		};

		Group.prototype.getQuickViewBase = function () {
			var oParent = this.getParent();
			if (oParent && oParent.getQuickViewBase) {
				return oParent.getQuickViewBase();
			}
			return null;
		};

		return Group;

	});
