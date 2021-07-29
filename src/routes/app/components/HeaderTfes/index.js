import React, { Component, useState, useEffect } from 'react'
import { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link, withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { LineWeight } from '@material-ui/icons'
import HeaderTfesSubmenu from './HeaderTfesSubmenu'
// Mobile Sidebar
// import MobileSideBar from './MobileSideBar'
import navLinks from 'Services/_navLinks'
import { event } from 'jquery'
import { Thumbnail } from 'react-bootstrap'
import { useDispatch, useSelector, connect } from 'react-redux'
import { logoutUser, getUserMyProfile } from 'Ducks/session/auth'
import { getUserProfile } from 'Ducks/user'
// Right Nav
import RightNav from "./RightNav";

// import Clock from './Clock';
import Clock from 'Components/StandardFormat/Clock';

// import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function Header(props) {
  const { location } = props
  // const  date = new Date().toDateString("en")
  const date =
    new Date().toLocaleDateString('en') +
    ' ' +
    new Date().toLocaleTimeString('en')

  // this.props.setProduct(data);

  const userLogin = useSelector((state) => state.sessionState.authState.user)

  useEffect( () => {
    // const test = useDispatch(getUserProfile())
    props.getUserProfile()
    props.getUserMyProfile()
  }, [])


  // const dispatch = useDispatch()

  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const [anchorEl3, setAnchorEl3] = React.useState(null)
  const open1 = Boolean(anchorEl)
  const open = Boolean(anchorEl2)
  const open3 = Boolean(anchorEl3)
  const id = open ? 'simple-popover' : undefined

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
    // setAnchorEl(event.currentTarget);
  }
  const handleClickMain = (event) => {
    setAnchorEl2(event.currentTarget)

    console.log('event.handleClickMain')
  }
  const handleClickDashboard = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setAnchorEl2(null)
  }

  const closeMainMenu = () => {
    setAnchorEl2(null)
  }

  // const logoutHandler = () => {
  //   dispatch(logoutUser())
  // }
  // const handleClose2 = () => {
  //   setAnchorEl2(null);
  //   setAnchorEl3(null);
  // };
  // const goToDashboard=()=>{
  //  this.props.history.push('app/dashboard')
  // }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className="rct-header"
        style={{ backgroundColor: '#2b4da0' }}
      >
        <Toolbar
          style={{ height: '60', minHeight: '54' }}
          className="d-flex justify-content-between w-100"
        >
          <div className="d-flex">
            <div className="site-logo">
              <Link to="/app/dashboard" className="logo-mini">
                <img
                  src={require('Assets/img/TFES_Logo_White_Orange_Cropped.png')}
                  alt="site logo"
                  width="100"
                />
              </Link>
            </div>
          </div>

          <Typography
            variant="h6"
            className={classes.title}
            style={{ display: 'flex' }}
          >
            <div
              className="Typography"
              style={{ display: 'flex', margin: '0 auto' }}
            >
              <button
                className="main-dashbord"
                id={id}
                aria-describedby={id}
                variant="contained"
                color="primary"
                onClick={handleClickMain}
                handleClose={handleClose}
              >
                Main
              </button>
              <Link
                to={{ pathname: '/app/dashboard' }}
                style={{ color: '#ffffff' }}
              >
                {' '}
                <button
                  className="main-dashbord"
                  aria-describedby={id}
                  variant="contained"
                  color="primary"
                >
                  {' '}
                  Dashboard
                </button>
              </Link>
            </div>
          </Typography>
         
          <div style={{ display: 'flex', margin: '0 auto' }}>
            <Clock />
          </div>
          <div>
              {userLogin && (
                <div>
                  <p
                    className="timedisplay"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      margin: '3px'
                    }}
                  >
                    {userLogin.name}
                  </p>
                </div>
              )}
            </div>

          
          <RightNav />
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl2}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        style={{ borderRadius: 0 }}
      >
        <HeaderTfesSubmenu 
        className={classes.typography} 
        handleClose={closeMainMenu}
        />
      </Popover>
    </div>
  )
}

// export default withRouter(Header)

const mapStateToProps = ({sessionState}) => {

  return sessionState;
}

export default connect(mapStateToProps, {
  // getAllDeliveryOrders,
  // deleteDeliveryOrderItem,
  // show
  getUserProfile,
  getUserMyProfile
})(Header)
