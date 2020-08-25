sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (BaseController, Controller, History) {
	"use strict";

	return BaseController.extend("MT.SMT_Managment.controller.leaveAndAssetView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MT.SMT_Managment.view.leaveAndAssetView
		 */
		onInit: function () {

		},
		onPressLogout: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("RouteDashboardView", {}, true);
			}
		},

		onCloseFragmentLeaveAction: function () {
			this.LeaveActionFragment.close();
		},
		onPressLeaveApprovel: function (oEvent) {
			var newData = oEvent.getSource().getBindingContext("DOB").getObject();
			if (newData.Status == "Pending") {
				var tempNewsCardModel = new sap.ui.model.json.JSONModel();
				this.getOwnerComponent().setModel(tempNewsCardModel, "/LeaveAction");
				var tempNewsCardArray = [];
				tempNewsCardArray.push(newData);

				this.getOwnerComponent().getModel("DOB").setProperty("/LeaveAction", tempNewsCardArray);
				var LeaveActionFragmentId = this.createId("LeaveActionFragmentId");
				if (!this.relievingEventFragment) {
					this.LeaveActionFragment = new sap.ui.xmlfragment(this.getView().getId(LeaveActionFragmentId),
						"MT.SMT_Managment.fragments.LeaveAction",
						this);
					this.getView().addDependent(this.LeaveActionFragment);
				}
				this.LeaveActionFragment.open();
			}

		},
		onClickLeaveApprival: function () {
			var obj = this.getOwnerComponent().getModel("DOB").getProperty("/LeaveAction");
			var newData = this.getOwnerComponent().getModel("DOB").getProperty("/Leave");
			for (var i = 0; i < newData.length; i++) {
				if (obj[0].empId == newData[i].empId && obj[0].Fdate == newData[i].Fdate && obj[0].Status == newData[i].Status) {
					newData[i].Status = "approved";
				}
			}
			this.getOwnerComponent().getModel("DOB").setProperty("/Leave", newData);
			this.LeaveActionFragment.close();

		},
		onClickLeaveReject: function () {
			var obj = this.getOwnerComponent().getModel("DOB").getProperty("/LeaveAction");
			var newData = this.getOwnerComponent().getModel("DOB").getProperty("/Leave");
			for (var i = 0; i < newData.length; i++) {
				if (obj[0].empId == newData[i].empId && obj[0].Fdate == newData[i].Fdate && obj[0].Status == newData[i].Status) {
					newData[i].Status = "Rejected";
				}
			}

			this.getOwnerComponent().getModel("DOB").setProperty("/Leave", newData);
			this.LeaveActionFragment.close();
		},

		onPressAssetApprovel: function (oEvent) {
			var newData = oEvent.getSource().getBindingContext("DOB").getObject();
			if (newData.Status == "Pending") {
				var tempNewsCardModel = new sap.ui.model.json.JSONModel();
				this.getOwnerComponent().setModel(tempNewsCardModel, "/asset");
				var tempNewsCardArray = [];
				tempNewsCardArray.push(newData);

				this.getOwnerComponent().getModel("DOB").setProperty("/asset", tempNewsCardArray);
				var assetActionFragmentId = this.createId("assetActionFragmentId");
				if (!this.relievingEventFragment) {
					this.assetActionFragment = new sap.ui.xmlfragment(this.getView().getId(assetActionFragmentId),
						"MT.SMT_Managment.fragments.assetAction",
						this);
					this.getView().addDependent(this.assetActionFragment);
				}
				this.assetActionFragment.open();
			}
		},
		onClickAssetApprival: function () {
			var obj = this.getOwnerComponent().getModel("DOB").getProperty("/asset");
			var newData = this.getOwnerComponent().getModel("DOB").getProperty("/Asset");
			for (var i = 0; i < newData.length; i++) {
				if (obj[0].empId == newData[i].empId && obj[0].AssetName == newData[i].AssetName && obj[0].Status == newData[i].Status && obj[0].assetId ==
					newData[i].assetId) {
					newData[i].Status = "Resolved";
				}
			}
			this.getOwnerComponent().getModel("DOB").setProperty("/Asset", newData);
			this.assetActionFragment.close();
		},
		onCloseFragmentAsseteAction: function () {
			this.assetActionFragment.close();
		},
		onSearch: function (oEvent) {
				// debugger;
				var search = oEvent.getParameter("newValue");
				var oFilterName = new sap.ui.model.Filter(
					"Reason",
					sap.ui.model.FilterOperator.Contains,
					search);

				var oFilter = new sap.ui.model.Filter({
					// filters: [oFilterName, oFilterId],
					filters: [oFilterName],
					and: false
				});
				var aFilter = [oFilter];
				// var aFilterId = [oFilterId];
				var oList = this.getView().byId("idLeaveTable");
				oList.getBinding("items").filter(aFilter);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf MT.SMT_Managment.view.leaveAndAssetView
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MT.SMT_Managment.view.leaveAndAssetView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MT.SMT_Managment.view.leaveAndAssetView
		 */
		//	onExit: function() {
		//
		//	}

	});

});