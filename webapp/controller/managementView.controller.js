sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, JSONModel) {
	"use strict";

	return Controller.extend("MT.SMT_Managment.controller.managementView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MT.SMT_Managment.view.managementView
		 */
		onInit: function () {

			this.Router = sap.ui.core.UIComponent.getRouterFor(this);
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
			// debugger;

			var emiFragmentId = this.createId("emiFragmentId");
			if (!this.empAddFragment) {
				this.empAddFragment = new sap.ui.xmlfragment(this.getView().getId(emiFragmentId), "MT.SMT_Managment.fragments.addEmp",
					this);
				this.getView().addDependent(this.empAddFragment);
			}

			this.empAddFragment.open();
			var emploee = this.getOwnerComponent().getModel("DOB").getProperty("/Employee");
			this.getView().byId("empAddFId").setValue("Emp0" + emploee.length);
		},
		managementEventDate: function () {
			var curDate = new Date();
			var d = curDate.getDate();
			var m = curDate.getMonth();
			var m2 = curDate.getMonth() + 1;
			var y = curDate.getFullYear();

			var maxDate = new Date(y, m2, d);
			var minDate = new Date(y, m, d);
			this.getView().byId("addEventsMangFragementDate").setMinDate(minDate);
			this.getView().byId("addEventsMangFragementDate").setMaxDate(maxDate);
		},
		onPressAddEvent: function () {
			// debugger;

			var addEventFragmentId = this.createId("addEventFragmentId");
			if (!this.managementEventAddFragment) {
				this.managementEventAddFragment = new sap.ui.xmlfragment(this.getView().getId(addEventFragmentId),
					"MT.SMT_Managment.fragments.addmanagementEvents",
					this);
				this.getView().addDependent(this.managementEventAddFragment);
			}

			this.managementEventAddFragment.open();
			var emploee = this.getOwnerComponent().getModel("DOB").getProperty("/Event") || [];
			this.getView().byId("addEventsMangFragementId").setValue("Event0" + emploee.length);
		},
		onCloseFragmentAddEmp: function () {

			this.empAddFragment.close();
		},
		onPressLogout: function () {

			this.Router.navTo("RouteDashboardView");
		},
		onClickAddEvents: function () {

			var oModelEvent = this.getOwnerComponent().getModel("DOB").getProperty("/Events") || [];
			var EmpId = this.getView().byId("addEventsMangFragementId").getValue();
			var name = this.getView().byId("addEventsMangFragementName").getValue();
			var date = this.getView().byId("addEventsMangFragementDate").getValue();
			var eveName = this.getView().byId("addEventsMangFragementEvent").getValue();
			if (date == "") {
				this.getView().byId("addEventsMangFragementDate").focus();
				this.getView().byId("addEventsMangFragementDate").setValueState("Error");
				this.getView().byId("addEventsMangFragementDate").setValueStateText("Date required");

				return;
			}
			if (eveName == "") {
				this.getView().byId("addEventsMangFragementEvent").focus();
				this.getView().byId("addEventsMangFragementEvent").setValueState("Error");
				this.getView().byId("addEventsMangFragementEvent").setValueStateText("Event Name required");

				return;
			}
			var obj = {
				EmpId: EmpId,
				name: name,
				date: date,
				eveName: eveName
			};
			oModelEvent.push(obj);
			this.getOwnerComponent().getModel("DOB").setProperty("/Events", oModelEvent);
			this.managementEventAddFragment.close();
		},
		onCloseFragmentEventEmp: function () {
			this.managementEventAddFragment.close();
		},
		onAddEmpClick: function () {
			var EmpId = this.getView().byId("empAddFId").getValue();
			var Name = this.getView().byId("fNameFId").getValue() + " " + this.getView().byId("lNameFId").getValue();
			// var LName = this.getView().byId("lNameFId").getValue();
			var image = "https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
			var Department = this.getView().byId("empAdddepFId").getValue();
			var Email = this.getView().byId("empAddEmailId").getValue();
			var startDate = this.getView().byId("empAddStareId").getValue();
			var endDate = this.getView().byId("empAddEndId").getValue();
			// var empName = this.getView().byId("addEventsEmpFragementId").getValue();
			var date = this.getView().byId("empAddDOBId").getValue();
			var obj = {
				EmpId: EmpId,
				image: image,
				Department: Department,
				Email: Email,
				startDate: startDate,
				endDate: endDate,
				empName: Name,
				date: date
			};

			var array = this.getOwnerComponent().getModel("DOB").getProperty("/Employee");
			array.push(obj);
			this.getOwnerComponent().getModel("DOB").setProperty("/Employee", array);

			this.empAddFragment.close();
		},
		handleChangeDOB: function () {
			debugger;
			// var minDate: new Date(2019, 8, 15);
			var curDate = new Date();
			var d = curDate.getDate();
			var m = curDate.getMonth();
			var y = curDate.getFullYear() - 21;
			var y1 = curDate.getFullYear() - 45;

			var maxDate = new Date(y, m, d);
			var minDate = new Date(y1, m, d);
			this.getView().byId("empAddDOBId").setMinDate(minDate);
			this.getView().byId("empAddDOBId").setMaxDate(maxDate);
		},
		handleChangeStartDate: function () {
			debugger;
			// var minDate: new Date(2019, 8, 15);
			var curDate = new Date();
			var d = curDate.getDate();
			var m = curDate.getMonth() + 1;
			var m2 = curDate.getMonth() + 2;
			var y = curDate.getFullYear();

			var maxDate = new Date(y, m2, d);
			var minDate = new Date(y, m, d);
			this.getView().byId("empAddStareId").setMinDate(minDate);
			this.getView().byId("empAddStareId").setMaxDate(maxDate);
		},
		onchangeStartDate: function () {
			var curDate = new Date();
			var d = curDate.getDate();
			var m = curDate.getMonth();
			var y2 = curDate.getFullYear() + 3;

			this.getView().byId("empAddEndId").setValue(m + ", " + d + ", " + y2);
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