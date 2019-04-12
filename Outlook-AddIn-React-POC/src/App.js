import React, { Component } from 'react';
import './App.css';

//Importing Layout classes  https://developer.microsoft.com/en-us/fabric#/styles/layout
import 'office-ui-fabric-core/dist/css/fabric.min.css'

import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import axios from 'axios';
import { styles, ColorClassNames, } from '@uifabric/styling';
import { initializeIcons } from '@uifabric/icons';

class App extends Component {


    office = window.Office;
    officeMailBoxItem = window.Office.context.mailbox.item;

    constructor(props) {
        super(props);
        this.setSubject("Leave Request");

        this.getEmailList();

        //Without this line Datepicker calendar icon and dropdown caret icon does not display
        initializeIcons();
    }

    emailDetails = {
        subject: '',
        reason: '',
        startDate: new Date(),
        endDate: new Date(),
        leaveType: '',
    };

    setSubject = (subject) => {
        this.emailDetails.subject = subject;
        this.officeMailBoxItem.subject.setAsync(subject);
    };

    setStartDate = (value) => {
        let date = new Date(value);
        this.emailDetails.startDate;
    };

    setEndDate = (value) => {
        let date = new Date(value);
        this.emailDetails.endDate = date;
    };

    setLeaveType = (option) => {
        this.emailDetails.leaveType = option;
    };

    setReason = (value) => {
        this.emailDetails.reason = value;
    };

    createMessage = () => {
        this.officeMailBoxItem.body.prependAsync(
            '<p>' +
            ' Hi, <br/>' +
            'I am on ' + this.emailDetails.leaveType.text + ' from ' + this.emailDetails.startDate.toLocaleDateString() + ' to ' + this.emailDetails.endDate.toLocaleDateString() +
            ', because ' + this.emailDetails.reason + '. <br/> <br/>' +
            'Thank you.' +
            '</p>',
            { coercionType: this.office.CoercionType.Html })
    };

    getEmailList = () => {

        let setEmail = () => {
            this.officeMailBoxItem.to.setAsync(["tirthg@saleshandyonmicrosoft.com"]);
        };
        setEmail();
    };

    render() {
        return (
            <div id="addInContainerDiv" class='ms-grid'>

                <div class="ms-Grid-row" >
                    <DatePicker className="ms-Grid-col ms-sm12 ms-lg4"
                        name="Start Date"
                        placeholder='Select the From Date'
                        onSelectDate={
                            this.setStartDat
                        }
                    />
                </div>

                <div class="ms-Grid-row" >
                    <DatePicker className="ms-Grid-col ms-sm12 ms-lg4"
                        name="End Date"
                        placeholder='Select the To Date'
                        onSelectDate={
                            this.setEndDate
                        }
                    />
                </div>

                <div class="ms-Grid-row" >
                    <Dropdown className="ms-Grid-col ms-sm12 ms-lg4"
                        placeHolder='Select Leave Type'
                        onChanged={
                            this.setLeaveType
                        }
                        options={
                            [
                                { key: 'annual', text: 'Annual Leave' },
                                { key: 'personal', text: 'Sick/Carer Leave' }
                            ]} > </Dropdown>
                </div>

                <div class="ms-Grid-row" >
                    <TextField className="ms-Grid-col ms-sm12 ms-lg4"
                        label='Reason'
                        onChanged={
                            this.setReason
                        }
                        multiline
                        rows={5}
                        autoAdjustHeight
                    />
                </div>
                <div class="ms-Grid-row" >
                    <div id="buttonContainerDiv" className="ms-Grid-col ms-sm12 ms-lg4">
                        <DefaultButton id='OKButton' primary={true} onClick={this.createMessage} >
                            Apply
              </DefaultButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;