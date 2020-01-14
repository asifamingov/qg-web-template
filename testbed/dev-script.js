(function($, qg) {
  "use strict";
  var dateOptions = {  minDate: new Date(2019, 7 - 1, 1), maxDate: 0 , dateFormat: 'dd/mm/yy', changeYear: true, changeMonth: true};

  //Variables ---------------------------------------------------------------------------------
  //First eligibility question:
  var yes_eligible_1 = $('#yes_eligible_1');
  var no_eligible_1 = $('#no_eligible_1');
  var $dob = $('#dob');

  //Select options for employer size
  var employersize = $("#employer-size");
  var self_employed = "Self employed";
  var small_medium_business = "Small-medium business";
  var other_emplpyer = "Other";

  //Eligibility - callout for failed validation
  var eligible_n_1 = $("#noteligible-1");
  var eligible_n_2 = $("#noteligible-2");

  //Volunteering details
  var RFS_member_checkbox = $('#RFS_member');
  var SES_member_checkbox = $('#SES_member');

  var RFS_member_input = $('#if-RFS-member');
  var SES_member_input = $('#if-SES-member');

  //Income fields - for validation
  var income_loss_field = $("#loss-per-day");
  var days_worked_field = $("#total-days");

  //Excess day controls -
  //increment variable is used when additional div rows are added
  var add_new = $("#new_excess_day");
  var remove_last = $("#remove_last_day");
  var row_container = $("#excess-rows");
  var day_increment = 11;

  //Check dates on selection to see if exists
  var date = $('.date-input');
  var claim_dates = [];

  //Calculate totals for each date
  var claim_value = $('.claim_value');
  var total_claim = 0;
  var total_claim_input = $('input.total-claim-amount');
  var total_claim_input_display = $('span.total-claim-amount');
  //Personal details section
  var employer_details = $("#detail-section-1");
  var personal_details = $("#detail-section-2");

  //Days outside QLD Y/N
  var outside_qld_y = $('#outside_qld_y');
  var outside_qld_n = $('#outside_qld_n');

  //Confirm
  var replyRequested = $("#replyRequested");
  var confirmCriteria = $("#confirmCriteria");

  //Inputs
  var input_btn = $('#detail-section-2 input[type="submit"]');
  var mainForm = $('#firefighters-support-application');


  //Functions and events --------------------------------------------------------------------
  function formReady() {
    personal_details.relevance("relevant", false);
    eligible_n_1.relevance("relevant", false);
    eligible_n_2.relevance("relevant", false);
    $('#if-RFS-member').relevance('relevant', false);
    $('#if-SES-member').relevance('relevant', false);
    input_btn.prop("disabled", true);
    $('#total-days').attr('value',day_increment);
    $( ".date-input").datepicker(dateOptions);
    $dob.datepicker({  maxDate: '0', dateFormat: 'dd/mm/yy', changeYear: true,   changeMonth: true});
  }

  // stop future date selection

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if(month < 10)
    month = '0' + month.toString();
  if(day < 10)
    day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;
  $('.date-input').attr('max', maxDate);

  //OnReady/directed - reset selections
  $(document).ready(function() {
    formReady();

  });

  //On change events, trigger relevance
  yes_eligible_1.on("change", function() {
    if ($(this).is(":checked")) {
      eligible_n_1.relevance("relevant", false);
      //Reset default child options on parent change
      if (employersize.val() !== 'Select an option') {
        employersize.prop('selectedIndex',0);
      }
      employer_details.relevance("relevant", true);
      personal_details.relevance("relevant", false);
      no_eligible_1.prop('checked', false);
    } else {
      employer_details.relevance("relevant", false);
      personal_details.relevance("relevant", false);
    }
  });

  no_eligible_1.on("change", function() {
    if ($(this).is(":checked")) {
      if($('#noteligible-2').is(":hidden")){
        eligible_n_1.relevance("relevant", true);
      }
      employer_details.relevance("relevant", false);
      personal_details.relevance("relevant", false);
      yes_eligible_1.prop('checked', false);
    } else {
      eligible_n_1.relevance("relevant", false);
    }
  });

  employersize.on("change", function() {
    if ($(this).val() === self_employed || $(this).val() === small_medium_business) {
      eligible_n_2.relevance("relevant", false);
      personal_details.relevance("relevant", true);
      input_btn.prop("disabled", true);
    } else if ($(this).val() === other_emplpyer) {
      eligible_n_2.relevance("relevant", true);
      input_btn.prop("disabled", true);
      personal_details.relevance("relevant", false);
    }
  });

  //DOB services
  $dob.on("change", function() {
    var dobPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
      dobField = $(this),
      value = dobField.val()
    ;

    // if there is no value
    if ( value === '' ) {
      // clear the custom error
      dobField[ 0 ].setCustomValidity( '' );
      // required field validation will kick in

      // test if value matches pattern
    } else if ( dobPattern.test( value )) {
      // valid
      dobField[ 0 ].setCustomValidity( '' );

    } else {
      // invalid
      dobField[ 0 ].setCustomValidity( 'Must be in correct format dd/mm/yyyy' );
    }
  });

  //Volunteer services
  SES_member_checkbox.on("change", function() {
    if ($(this).is(":checked")) {
      SES_member_input.relevance('relevant', true);
    } else {
      SES_member_input.relevance('relevant', false);
    }
  });

  $('#RFS_member').on("change", function() {
    console.log('you chnages rfs number');
    if ($(this).is(":checked")) {
      $('#if-RFS-member').relevance('relevant', true);
    } else {
      $('#if-RFS-member').relevance('relevant', false);
    }
  });

  //Add new table append function
  $(document).on('click', '#new_excess_day', function(){
    setTimeout(function () {
      $( ".date-input").datepicker(dateOptions);
    },0);
    day_increment = day_increment + 1;
    $('#total-days').attr('value',day_increment);
    var new_day = "\
    <tr>\
        <td>"+day_increment+"</td>\
        <td><label for=\"vol["+day_increment+"][day]\"><span class=\"label\" ><span hidden=\"hidden\">Claim Day "+day_increment+"</span></span></label>\
        <input class='date-input test' placeholder='Select a date' id='vol["+day_increment+"][day]' name='vol["+day_increment+"][day]' type='text' min='2019-07-01' required='required'></td>\
        <td><label for=\"vol["+day_increment+"][claim]\"><span class=\"label\" ><span hidden=\"hidden\">Claim Value "+day_increment+"</span></span></label>\
        <input class='claim_value' placeholder='$0' type='number' minlength='1' name='vol["+day_increment+"][claim]' required='required' id='vol["+day_increment+"][claim]'></td>\
    </tr>";
    row_container.append(new_day);
  });

  remove_last.click(function() {
    if(day_increment > 11){
      day_increment = day_increment - 1;
      $('#excess-rows tr:last-child').remove();
      $('#total-days').attr('value',day_increment);
      var total_claim = 0;
      $('.claim_value').each(function () {
        if($(this).val() > 300){
          $(this)[0].setCustomValidity('Claim must not exceed $300')
        } else {
          $(this)[0].setCustomValidity('')
        }
        function getNum(val) {
          if (isNaN(val)) {
            return 0;
          }
          return val;
        }
        if($(this).val()){
          total_claim = getNum(total_claim) + parseInt(getNum($(this).val()));
        }
      });
      total_claim_input.attr('value',total_claim);
      total_claim_input_display.text(total_claim);

      if(total_claim > 6000){
        $(total_claim_input)[0].setCustomValidity('Total must not exceed $6000')
      } else {
        $(total_claim_input)[0].setCustomValidity('')
      }
    }
  });

  //Days outside QLD?
  outside_qld_y.on("change", function() {
    if ($(this).is(":checked")) {
      outside_qld_n.prop('checked', false);
    }
  });
  outside_qld_n.on("change", function() {
    if ($(this).is(":checked")) {
      outside_qld_y.prop('checked', false);
    }
  });

  //Check to see if date already exists
  date.on("change", function() {
    var new_date = $(this).val();
    if (claim_dates.indexOf(new_date)) {
      //$(this).setCustomValidity('');
    } else {
      claim_dates.push(new_date);
      console.log(claim_dates);e
    }
  });
  var date_values = [];
  var date_values_filtered = [];

  function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);
    }
    return false;
  }

  function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '/' + parseInt(monthIndex)+1 + '/' + year;
  }


  function formatDateWithName(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var monthIndex = date.getMonth();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  function datesValid(date){
    var dateFrom = "01/07/2019";
    var dateTo = formatDate(new Date()).toString();
    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = date.split("/");
    var parsedDate = Date.parse(date);
    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return check >= from && check <= to
  }
  function dateExist(date) {
    return date_values.some(function(el) {
      return el.date === date;
    });
  }
  function itemExist(idVal){
    return date_values.find(function (x) {
      return x.id === idVal
    });
  }
  $(document).on('change', '.date-input', function(){
    // entered  date is valid
    var valEntered = $(this).val();
    var idVal = $(this).attr('id');
    var datesTable = $('.tbl-volunteer-dates');
    var item = itemExist(idVal);
    $(this).parent().find('.alert').remove();
    $(this).parent().find( ".hint").remove();
    if(isNaN(valEntered) === true){
        if(dateExist(valEntered)){
            if (item) {
              item.date = '';
            }
            $(this)[0].setCustomValidity('Claim dates must be different');
            if($(this).parent().find( ".hint").length <= 0) {
                  $( "<small class=\"hint\"><em>Claim dates must be different</em></small>" ).insertAfter($(this));
            }
        } else if(datesValid(valEntered) === false) {
            if (item) {
              item.date = '';
            }
           $(this)[0].setCustomValidity('Dates must be between 1 July 2019 to' + ' ' + formatDateWithName(new Date()) + '');
           if($(this).parent().find( ".hint").length <= 0) {
             $("<small class=\"hint range\"><em>Dates must be between 1 July 2019 to ".concat(formatDateWithName(new Date()), " </em></small>")).insertAfter($(this));
           }
         }
        else {
          if (item) {
            item.date = valEntered;
          } else {
            date_values.push({id: idVal, date: valEntered});
          }
          $(this).parent().find('.alert').remove();
          $(this).parent().find( ".hint").remove();
          $(this)[0].setCustomValidity('');
        }
    } else {
      if (item) {
        item.date = '';
      }
      $("<small class=\"hint format\"><em>Please enter Date is correct format</em><small>").insertAfter($(this));
      $(this)[0].setCustomValidity('Please enter the Date is a correct format (dd/mm/yyyy)');
    }
    console.log(date_values);
  });
  //Check to see if date already exists
  $(document).on('keyup', '.claim_value', function(){
    var total_claim = 0;
    if($(this).val() > 300){
      if($(this).parent().find( ".hint").length <= 0){
        $( "<small class=\"hint\"><em>Claim must not exceed $300</em></small>" ).insertAfter($(this));
      }
    } else {
      $(this).parent().find( ".hint").remove();
    }
    $('.claim_value').each(function () {
      if($(this).val() > 300){
        $(this)[0].setCustomValidity('Claim must not exceed $300')
      } else {
        $(this)[0].setCustomValidity('')
      }
      function getNum(val) {
        if (isNaN(val)) {
          return 0;
        }
        return val;
      }
      if($(this).val()){
        total_claim = getNum(total_claim) + parseInt(getNum($(this).val()));
      }
    });
    total_claim_input.attr('value',total_claim);
    total_claim_input_display.text(total_claim);

    if(total_claim > 6000){
      $(total_claim_input)[0].setCustomValidity('Total must not exceed $6000')
    } else {
      $(total_claim_input)[0].setCustomValidity('')
    }
  });

  //On checkbox confirm
  replyRequested.on("change", function() {
    if (replyRequested.is(":checked") && confirmCriteria.is(":checked")) {
      input_btn.prop("disabled", false);
    } else {
      input_btn.prop("disabled", true);
    }
  });

  //On checkbox confirm
  confirmCriteria.on("change", function() {
    if (replyRequested.is(":checked") && confirmCriteria.is(":checked")) {
      input_btn.prop("disabled", false);
    } else {
      input_btn.prop("disabled", true);
    }
  });

  var minOneCheckboxGroups = [ 'member' , 'volunteer-role' ],
    seen = {},

    // check that at least one checkbox is checked
    minOneCheckboxCheckedCheck = function() {
      var checkboxes = $( this.form.elements[ this.name ] ),
        validitionMessage = ''
      ;
      // must have 1 item selected
      if ( checkboxes.filter( ':checked' ).length === 0 ) {
        validitionMessage = 'Must be completed';
      }
      // set validity on every checkbox in the group (UI isn't updated otherwise)
      checkboxes.each(function() {
        this.setCustomValidity( validitionMessage );
      });
    };
  // find checkboxes
  minOneCheckboxGroups = $( 'input' ).filter(function() {
    return $.inArray( this.name, minOneCheckboxGroups ) >= 0;
  });
  // initial validity for group
  minOneCheckboxGroups.each(function() {
    if ( ! seen[ this.name ] ) {
      seen[ this.name ] = true;
      minOneCheckboxCheckedCheck.apply( this );
    }
  })
    // setup event handler
    .on( 'change', minOneCheckboxCheckedCheck );


  formReady();

})(jQuery, qg);
