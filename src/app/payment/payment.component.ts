import { Component } from '@angular/core';
declare var Jquery:any;
declare var $:any;
declare var WirecardPaymentPage:any;
// declare var WirecardPaymentPage:any;
declare var sha256:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor() {}

  title = 'abgular 4 with jquery';

  processSucceededResult(err) {
    console.log('processSucceededResulterr:', err);
    console.log('processSucceededResulterr:', JSON.stringify(err));
  }

  processErrorResult(err) {
    console.log('processErrorResulterr:', err);
    console.log('processErrorResulterr:', JSON.stringify(err));
  }

  convertToTens(value) {
    var number = value.toString();
    if (number.length == 1) {
        return "0" + number;
    } else {
        return number;
    }
}


 dd = new Date();
 ss = this.dd.getUTCFullYear() + (this.convertToTens(this.dd.getUTCMonth() + 1)) + (this.convertToTens(this.dd.getUTCDate())) + this.convertToTens(this.dd.getUTCHours()) + this.convertToTens(this.dd.getUTCMinutes()) + this.convertToTens(this.dd.getUTCSeconds());
 request_time_stamp = this.ss;


 request_id = "c63b9d39-96qd-1c7b279f6-0he9abebcb18" + this.request_time_stamp;
  merchant_account_id = "33f6d473-3036-4ca5-acb5-8c64dac862d1";
  transaction_type = "authorization";
  requested_amount = "10.50";
  requested_amount_currency = "EUR";
  secret_key = "9e0130f6-2e1e-4185-b0d5-dc69079c75cc";
  ip_address = "111.125.208.18";
  
  autoSig = sha256(this.request_time_stamp + this.request_id + this.merchant_account_id + this.transaction_type + this.requested_amount + this.requested_amount_currency + this.ip_address + this.secret_key);

  requestData = {
    "request_id": this.request_id,
    "request_time_stamp": this.request_time_stamp,
    "merchant_account_id": this.merchant_account_id,
    "transaction_type": this.transaction_type,
    "requested_amount": this.requested_amount,
    "requested_amount_currency": this.requested_amount_currency,
    "ip_address": this.ip_address,
    "request_signature": this.autoSig,
    "payment_method" : "creditcard"
};

  toggleTitle() {
    $('.title').slideToggle(); //

    WirecardPaymentPage.seamlessRenderForm({
      requestData: this.requestData,
      wrappingDivId: "seamless-target",
      onSuccess: this.processSucceededResult,
      onError: this.processErrorResult
    });
  }

  pay() {
    console.log("Submitted fun");
    WirecardPaymentPage.seamlessSubmitForm({
      onSuccess: this.processSucceededResult,
      onError: this.processErrorResult
    });
  }

  

}

