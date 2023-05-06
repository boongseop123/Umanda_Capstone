import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Tab(props) {
  const { activeTab, label, onClick } = props;

  const classes = classNames({
    tab: true,
    active: activeTab === label.toLowerCase(),
  });

  return (
    <div className={classes} onClick={onClick}>
      {label}
    </div>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
