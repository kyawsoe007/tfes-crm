import React from 'react'
import { connect } from 'react-redux'

function AccessControl(props) {
  const { children, action, user, access, match, noAccessComponent } = props
  if (user) {
    for (let i = 0; i < action.length; i++) {
      var act = action[i]
      if (act == 'me') {
        if (user.id == match.params.id) return children
      } else if (act == 'global') {
        return children
      } else {
        if (user.isSuperAdmin) {
          return children
        } else {
          if (
            access.find((acc) => {
              return `${acc.model}:${acc.method}` == action[i]
            })
          ) {
            return children
          }
        }
      }
    }
  }
  if (noAccessComponent) return noAccessComponent
  else return null
}

const mapStateToProps = ({ authUser }) => {
  const { user, loggedInUser } = authUser
  const { access } = loggedInUser
  return { user, access }
}

export default connect(mapStateToProps)(AccessControl)
