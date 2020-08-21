sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"MT/SMT_Managment/Util/validator",
	"sap/ui/core/routing/History"
], function (BaseController, Controller, Fragment, JSONModel, validator, History) {
	"use strict";

	return BaseController.extend("MT.SMT_Managment.controller.managementView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		onInit: function () {

			//	this.Router = sap.ui.core.UIComponent.getRouterFor(this);
			// var mParameters = {
			// 	success: function (odata, oRetrievedResult) {
			// 		var oModel1 = new JSONModel(odata.results);
			// 		debugger;

			// 	},

			// 	error: function (oError) {
			// 		debugger;
			// 	}
			// };
			// var oModel = new sap.ui.model.odata.ODataModel("sap/opu/odata/sap/ZEMP_MANAGEMENT_SRV");
			// oModel.read("/EmployeeDetailSet", mParameters);
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
			debugger;
			this._getFragement().open();

			
		},
		_getFragement: function () {
			if (!this._oDailog) { // chekking if the dialog box is = null or undefined, if yes then creating the object of the fragment.
				var oview = this.getView(); // getting the view object.
				var oID = this.createId("idFragment1"); //  Creating a Dynamic id for the fragment.
				this._oDailog = sap.ui.xmlfragment(oID, "MT.SMT_Managment.fragments.addEmp", this); // creating the fragment object.

				oview.addDependent(this._oDailog); // Adding the fragment to the controller.
			}
			return this._oDailog;
		},
		onCloseFragmentAddEmp: function () {

			this._getFragement().close();
		},
		onPressLogout: function () {

			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("RouteDashboardView", {}, true);
			}
		},
		/*	_getFildData : function(fildData){
					debugger;
				if(fildData=== undefined || fildData == "" || fildData == null ){
					return false;
				}
			},*/
		onSave: function () {
			debugger;
			var myFragId = this.createId("idFragment1");
			// Below is an array to store the ids for validation purpose.
			var lSid = ["fNameFId", "lNameFId", "empAdddepFId", "empAddposFId", "empAddEmailId", "empAddStareId", "empAddPassId"];
			// Below is an array to stroe the data of the fields for the validation.......
			var container = ["cfNameFId", "clNameFId", "cempAdddepFId", "cempAddposFId", "cempAddEmailId", "cempAddStareId", "cempAddPassId"];
			//  a loop to store the data into the data array.............................
			for (var i = 0; i < lSid.length; i++) {
				container[i] = sap.ui.core.Fragment.byId(myFragId, lSid[i]).getValue();
			}
			var dataError = [];
			var dataValid = [];
			var d = 0;
			var h = 0;
			for (var c = 0; c < container.length; c++) {
				if (container[c] === null || container[c] === "") {

					dataError[d] = lSid[c];
					d++;
				} else if (container[c] !== null || container[c] !== "") {
					dataValid[h] = lSid[c];
					h++;
				}
			}
			new validator().errorValidator(myFragId,dataError);
			new validator().validFields(myFragId,dataValid);
			
			if (dataError !== ""){
			debugger;
			new validator().setInitial(myFragId,lSid);
			}
		},

		onFname: function (oEvent) {
			debugger;
			this._getFname = oEvent.getSource();
			new validator().validatingFields(this._getFname);
			//	this._getFildData(this._getFname);
		},
		onLname: function (oEvent) {
			debugger;
			var getLname = oEvent.getSource();
			new validator().validatingFields(getLname);
		},
		onDepart: function (oEvent) {
			debugger;
			var getDepart = oEvent.getSource();
			new validator().validatingFields(getDepart);
		},
		onPos: function (oEvent) {
			debugger;
			var getPos = oEvent.getSource();
			new validator().validatingFields(getPos);
		},
		onEmail: function (oEvent) {
			debugger;
			this._getEmail = oEvent.getSource();
			new validator().emailValidation(this._getEmail);
			//this._getFildData(this._getEmail);
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