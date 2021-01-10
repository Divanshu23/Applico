import React from "react";

import {API_KEY,CLIENT_ID} from "./credentials.json";


      // Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';


  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        console.log("signed in")
      listLabels();
    } else {
      console.log("not signed in")
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }


  function listLabels() {
    gapi.client.gmail.users.labels.list({
      'userId': 'me'
    }).then(function(response) {
      var labels = response.result.labels;
      appendPre('Labels:');

      if (labels && labels.length > 0) {
        for (i = 0; i < labels.length; i++) {
          var label = labels[i];
          appendPre(label.name)
        }
      } else {
        appendPre('No Labels found.');
      }
    });
  }
export default class EmailComponent extends React.Component {
    state = {
      messages: []
    };
    handleClientLoad = ()=>  {
        gapi.load('client:auth2', initClient);
      }
   
    // Another way to get messages by ids
    // getMessages = () => {
    //   gmailApi.getMessageIds(false, 5).then(resIds => {
    //     gmailApi.getMessages(gmailApi.getArrayOfIds(resIds)).then(res => {
    //       this.setState({ messages: gmailApi.normalizeData(res) });
    //     });
    //   });
    // }
   
    render() {
      const { messages } = this.state;
      return (
        <div>
          <button onCLick={this.handleClientLoad}>Get Messages</button>
        
        </div>
      );
    }
  }