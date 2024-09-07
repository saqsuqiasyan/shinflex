import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './browseCategories.css'

const BrowseCategories = () => {
    const [cutterCategories, setUnderlineCategories] = useState(false)
    const [powerCategories, setPowerCategories] = useState(false)
    const [hideTools, setHideTools] = useState(false)

    return (
        <ul className='tool__browseCategories' style={hideTools ? { display: 'none' } : {}}>
            <Link to='/abrasives' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Abrasives</li>
            </Link>
            <div style={{
                position: 'relative'
            }}>
                <div
                    className={`browse_tool_item ${cutterCategories ? 'active' : ''}`}
                >
                    <Link to='/cutter-tools' className='tool_links browse_tool_item' style={{
                        borderBottom: 'none',
                        marginLeft: '0'
                    }} onClick={() => setHideTools(true)}>Cutter Tools</Link>
                </div>
                {cutterCategories && (
                    <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration={700}>
                        <Link to='/cutter-tools/cable-cutters' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Cable Cutters</li>
                        </Link>
                        <Link to='/cutter-tools/mitre-clamps' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Mitre Clamps</li>
                        </Link>
                        <Link to='/cutter-tools/scissors' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Scissors</li>
                        </Link>
                        <Link to='/cutter-tools/multi-tools' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Multi Tools</li>
                        </Link>
                    </div>
                )}

                <p className='more_tool_items' style={{
                    position: 'absolute',
                    top: '17px',
                    right: '20px'
                }} onClick={() => setUnderlineCategories(!cutterCategories)}>{cutterCategories ? '-' : '+'}</p>
            </div>
            <Link to='/hammers' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Hammers</li>
            </Link>
            <Link to='/nailers' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Nailers</li>
            </Link>
            <Link to='/scissors' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Scissors</li>
            </Link>
            <Link to='/washers' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Washers</li>
            </Link>
            <div style={{
                position: 'relative',
            }}>
                <div
                    className={`browse_tool_item ${powerCategories ? 'active' : ''}`}
                >
                    <Link to='/power-tools' className='tool_links browse_tool_item' style={{
                        borderBottom: 'none',
                        marginLeft: '0'
                    }} onClick={() => setHideTools(true)}>Power Tools</Link>
                </div>
                {powerCategories && (
                    <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration={700}>
                        <Link to='/power-tools/plier-sockets' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Plier Sockets</li>
                        </Link>
                        <Link to='/power-tools/prying' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Prying</li>
                        </Link>
                        <Link to='/power-tools/wrenches' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Wrenches</li>
                        </Link>
                        <Link to='/power-tools/snips' className='tool_links' onClick={() => setHideTools(true)}>
                            <li className='browse_tool_under_item'>Snips</li>
                        </Link>
                    </div>
                )}

                <p className='more_tool_items' style={{
                    position: 'absolute',
                    top: '17px',
                    right: '20px'
                }} onClick={() => setPowerCategories(!powerCategories)}>{powerCategories ? '-' : '+'}</p>
            </div>
            <Link to='/chargers' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item'>Chargers</li>
            </Link>
            <Link to='/impact-drills' className='tool_links' onClick={() => setHideTools(true)}>
                <li className='browse_tool_item' style={{
                    borderBottom: 'none'
                }}>Impact Drills</li>
            </Link>
        </ul>
    )
}

export default BrowseCategories;