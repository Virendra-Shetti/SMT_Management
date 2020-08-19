sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/UIComponent"
	],
	function (Controller, UIComponent) {
		"use strict";
		return Controller.extend("MT.SMT_Managment.Util.validator", {
			validatingFields: function (filId) {
				debugger;
				var valPromis = new Promise(function (resolve, reject) {

					if (filId.getValue() !== "") {
						resolve(filId);
					} else {
						reject(filId);
					}

				});
				valPromis.then(function (pass) {
					pass.setValueState("None");
					pass.showValueStateMessage(false);

				}).catch(function (faild) {
					faild.setValueState("Error").focus();
					//faild.showValueStateMessage(true);
					//	faild.setvalueStateText("Please fill the filed");
				});
				/*	if (filId.getValue() == "") {
						filId.setValueState("Error");

					} else {
						filId.setValueState("None");

					}*/
			},
			
			_reGEXemail: function (email) {
				var re =
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(String(email).toLowerCase());
			},
			
			emailValidation: function (filId) {
				debugger;
				var that = this;
				var valPromis = new Promise(function (resolve, reject) {
					var emailInput = filId.getValue();
					if (filId.getValue() !== "" && that._reGEXemail(emailInput)) {
						resolve(filId);
					} else {
						reject(filId);
					}

				});
				valPromis.then(function (pass) {
					pass.setValueState("None");
					pass.showValueStateMessage(false);

				}).catch(function (faild) {
					faild.setValueState("Error").focus();
					
				});
			
			}

		});

	});