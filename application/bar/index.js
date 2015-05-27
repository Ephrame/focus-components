var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();

var barMixin = {
  getDefaultProps: function getCartridgeDefaultProps(){
    return {
      appName: "",
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    applicationStore.removeSummaryComponentChangeListener(this._onComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    return {summaryComponent: applicationStore.getSummaryComponent() || {component: 'div', props: {}}};
  },
  _handleComponentChange: function _handleComponentChangeBarSummary(){
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = `bar ${this.props.style.className}`;
    return (
      <div className={className} data-focus='bar'>
        <div data-focus='bar-app-name'>{this.props.appName}</div>
        <div data-focus='bar-actions-left'>{this.props.actionLeft}</div>
        <div data-focus='bar-summary'><this.state.summaryComponent.component {...this.state.summaryComponent.props}/></div>
        <div data-focus='bar-user-infos'>
          <i className="mdi-action-language"></i>
          <i className="mdi-social-notifications"></i>
          <i className="mdi-action-account-circle"></i>
        </div>
      </div>
    );
  }
};

module.exports = builder(barMixin);
