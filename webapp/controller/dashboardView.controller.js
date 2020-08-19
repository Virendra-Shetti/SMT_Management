sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("MT.SMT_Managment.controller.dashboardView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MT.SMT_Managment.view.dashboardView
		 */
		onInit: function () {

			this.Router = sap.ui.core.UIComponent.getRouterFor(this);
			// debugger;
			var DOB = this.getOwnerComponent().getModel("DOB").getProperty("/Employee");
			// this.getView().byId("dashboardTotalNumOfEmpButtonId").setProperty("text", DOB.length);

			var birthDay = [];
			var Relieving = [];
			var anualData = [];
			var temp = new sap.ui.model.json.JSONModel();
			this.getOwnerComponent().setModel(temp, "thisMonth");
			for (var i = 0; i < DOB.length; i++) {
				var month = DOB[i].date.slice(3, 5);
				if (month == "08") {
					birthDay.push(DOB[i]);
				}
				debugger;
				var year = DOB[i].endDate.slice(6);
				if (year == "2020") {
					Relieving.push(DOB[i]);
				}
				var anual = DOB[i].startDate.slice(3, 5);
				if (anual == "08") {
					anualData.push(DOB[i]);
				}

			}
			debugger;
			this.getOwnerComponent().getModel("DOB").setProperty("/anualData", anualData);
			// this.getView().byId("dashboardAnniversaryEmpButtonId").setProperty("text", anualData.length);

			this.getOwnerComponent().getModel("DOB").setProperty("/Relieving", Relieving);
			// this.getView().byId("dashboardTotalNumOfRelievingEmpButtonId").setProperty("text", Relieving.length);

			this.getOwnerComponent().getModel("DOB").setProperty("/birthDay", birthDay);
			// var temp1 = this.getOwnerComponent().getModel("DOB").getProperty("/birthDay");
			// this.getView().byId("ThisMonthBirthDayButtonId").setProperty("text", birthDay.length);
		},
		onManagementCardClick: function () {
			debugger;
			this.Router.navTo("RouteManagementView");
		},
		onLeaveAsset: function () {

			this.Router.navTo("RouteLeaveAssetView");
		},
		onPressThisMonthBirthDay: function () {
			var birthdayFragmentId = this.createId("birthdayFragmentId");
			if (!this.birthdayFragment) {
				this.birthdayFragment = new sap.ui.xmlfragment(this.getView().getId(birthdayFragmentId), "MT.SMT_Managment.fragments.Birthday",
					this);
				this.getView().addDependent(this.birthdayFragment);
			}
			this.birthdayFragment.open();
		},
		onPressTotalNumOfRelievingEmp: function () {
			var TotalNumOfRelievingEmpFragmentId = this.createId("TotalNumOfRelievingEmpFragmentId");
			if (!this.RelievingEmpFragment) {
				this.RelievingEmpFragment = new sap.ui.xmlfragment(this.getView().getId(TotalNumOfRelievingEmpFragmentId),
					"MT.SMT_Managment.fragments.relieving",
					this);
				this.getView().addDependent(this.RelievingEmpFragment);
			}
			this.RelievingEmpFragment.open();
		},
		onPressAnniversaryEmp: function () {
				var AnniversaryEmpFragmentId = this.createId("TAnniversaryEmpFragmentId");
				if (!this.AnniversaryEmpFragment) {
					this.AnniversaryEmpFragment = new sap.ui.xmlfragment(this.getView().getId(AnniversaryEmpFragmentId),
						"MT.SMT_Managment.fragments.Anniversary",
						this);
					this.getView().addDependent(this.AnniversaryEmpFragment);
				}

				this.AnniversaryEmpFragment.open();
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf MT.SMT_Managment.view.dashboardView
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MT.SMT_Managment.view.dashboardView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MT.SMT_Managment.view.dashboardView
		 */
		//	onExit: function() {
		//
		//	}

	});

});