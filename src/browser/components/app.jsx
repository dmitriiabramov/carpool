var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Organization = require('./organization.jsx');
var MemberList = require('./member_list.jsx');
var Navigation = require('./navigation.jsx');
var EventForm = require('./event_form.jsx');
var App;

App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore', 'RideStore', 'EventStore', 'UserStore', 'MemberStore')],

    getInitialState() {
        // for some reason, I have to return an empty object (because of fluxxor)
        return {};
    },

    getStateFromFlux() {
        var flux = this.getFlux();
        var rides = [];
        var eventData =  flux.store('EventStore').get();
        var orgData = flux.store('OrganizationStore').get();
        var userData = flux.store('UserStore').get();
        var rideStore = flux.store('RideStore');
        var members = flux.store('MemberStore').get();
        var memberList = flux.store('MemberStore').getMembersWhoNeedRides();
        var selectedEvent = flux.store('EventStore').getSelectedEvent();

        if (selectedEvent) {
            selectedEvent.rideIds.forEach(function(rideId) {
                rides.push(rideStore.getById(rideId));
            });
        }

        return {
            orgData: orgData,
            rides: rides,
            eventData: eventData,
            user: userData.user,
            selectedEvent: selectedEvent,
            members: members,
            memberList: memberList
        };
    },

    render() {
        return (
            <div>
                <Navigation name={this.state.user.name}  type={this.state.user.type} />

                <Organization
                    onClick={this.onClick}
                    orgs={this.state.orgData.orgs}
                    rides={this.state.rides}
                    events={this.state.eventData.events}
                    selectedEvent={this.state.selectedEvent}
                    userType={this.state.user.type}
                    members={this.state.members}
                    memberList={this.state.memberList}
                />
            </div>
        );
    }
});

module.exports = App;
