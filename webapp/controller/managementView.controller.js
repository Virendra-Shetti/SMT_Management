sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("MT.SMT_Managment.controller.managementView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		onInit: function () {

		},

		onPressNotification: function (oEvent) {
			var oButton = oEvent.getSource();

			if (!this._oPopover) {
				Fragment.load({
					name: "MT.SMT_Managment.fragments.notification",
					controller: this
				}).then(function (oPopover) {
					this._oPopover = oPopover;
					this.getView().addDependent(this._oPopover);
					// this._oPopover.bindElement("/ProductCollection/0");
					this._oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopover.openBy(oButton);
			}

		},
		onPressAddEmp: function () {
			// debugger;
			var emiFragmentId = this.createId("emiFragmentId");
			if (!this.empAddFragment) {
				this.empAddFragment = new sap.ui.xmlfragment(this.getView().getId(emiFragmentId), "MT.SMT_Managment.fragments.addEmp",
					this);
				this.getView().addDependent(this.empAddFragment);
			}

			this.empAddFragment.open();
		},
		onCloseFragmentAddEmp: function () {

			this.empAddFragment.close();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		//	onExit: function() {
		//
		//	}

	});

});