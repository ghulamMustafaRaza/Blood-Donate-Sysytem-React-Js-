import React, { Component } from 'react';
import Loader from './Loader';
import { List, ListItem } from 'material-ui/List';
import { IconButton } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info';

// let a = [ 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-' ]
// let b = [
//   [ 0, 1, 2, 3, 4, 5, 6, 7 ],  // 'AB+',
//   [ 0, 2, 4, 6 ],  // 'AB-',
//   [ 0, 1, 4, 5 ],  // 'A+',
//   [ 0, 4 ],  // 'A-',
//   [ 0, 1, 2, 3 ],  // 'B+',
//   [ 0, 2 ],  // 'B-',
//   [ 0, 1 ],  // 'O+',
//   [ 0 ]  // 'O-'
// ]
// let c = b.reverse()
// let af = {
//   "blood-groups": [ "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" ],
//   "patients-acceps-index": [[ 0, 1, 2, 3, 4, 5, 6, 7 ],[ 0, 2, 4, 6 ],[ 0, 1, 4, 5 ],[ 0, 4 ],[ 0, 1, 2, 3 ],[ 0, 2 ],[ 0, 1 ],[ 0 ]],
//   "donor-donate-index": [[ 0, 1, 2, 3, 4, 5, 6, 7 ],[ 0, 2, 4, 6 ],[ 0, 1, 4, 5 ],[ 0, 4 ],[ 0, 1, 2, 3 ],[ 0, 2 ],[ 0, 1 ],[ 0 ]],
//   "patients-acceps-array": [[ "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" ],[ "AB+", "A+", "B+", "O+" ],[ "AB+", "AB-", "B+", "B-" ],[ "AB+", "B+" ],[ "AB+", "AB-", "A+", "A-" ],[ "AB+", "A+" ],[ "AB+", "AB-" ],[ "AB+" ]],
//   "donor-donate-array": [[ "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" ],[ "AB+", "A+", "B+", "O+" ],[ "AB+", "AB-", "B+", "B-" ],[ "AB+", "B+" ],[ "AB+", "AB-", "A+", "A-" ],[ "AB+", "A+" ],[ "AB+", "AB-" ],[ "AB+" ]],
//   "patients-acceps": {
//     "AB+": [ "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" ],
//     "AB-": [ "AB+", "A+", "B+", "O+" ],
//     "A+": [ "AB+", "AB-", "B+", "B-" ],
//     "A-": [ "AB+", "B+" ],
//     "B+": [ "AB+", "AB-", "A+", "A-" ],
//     "B-": [ "AB+", "A+" ],
//     "O+": [ "AB+", "AB-" ],
//     "O-": [ "AB+"
//     ]
//   },
//   "donor-donate": {
//     "AB+": [ "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" ],
//     "AB-": [ "AB+", "A+", "B+", "O+" ],
//     "A+": [ "AB+", "AB-", "B+", "B-" ],
//     "A-": [ "AB+", "B+" ],
//     "B+": [ "AB+", "AB-", "A+", "A-" ],
//     "B-": [ "AB+", "A+" ],
//     "O+": [ "AB+", "AB-" ],
//     "O-": [ "AB+" ]
//   }
// }

export default class Home extends React.PureComponent {
  render() {
    return (
      this.props.isLoading ? <Loader fullpage /> :
        <div>
          <h1>Home Works</h1>
          <List>
            {this.props.donors.map((a, i) => (
              <ListItem key={i} primaryText={a.name.toUpperCase() + ' | ' + a.group.toUpperCase()} rightIcon={<span><IconButton onClick={() => setTimeout(() => this.props.history.push('/detail/' + a.key), 200)} style={{ margin: -12 }}><ActionInfo color="#777" /></IconButton></span>} />
            ))}
          </List>
        </div>
    )
  }
}
