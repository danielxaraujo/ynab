import React, { Component } from 'react'

import { Badge, Nav, NavItem, NavLink } from 'reactstrap'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'

import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

class BaseHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<AppSidebarToggler className='d-lg-none' display='md' mobile />
				<AppNavbarBrand
					full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
					minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
				/>
				<AppSidebarToggler className='d-md-down-none' display='lg' />
				<Nav className='d-md-down-none' navbar>
					<NavItem className='px-3'>
						<NavLink href='/'>Dashboard</NavLink>
					</NavItem>
				</Nav>
				<Nav className='ml-auto' navbar>
					<NavItem className='d-md-down-none'>
						<NavLink href='#'><i className='fa fa-bell'></i><Badge pill color='danger'>5</Badge></NavLink>
					</NavItem>
				</Nav>
			</React.Fragment>
		)
	}
}

export default BaseHeader