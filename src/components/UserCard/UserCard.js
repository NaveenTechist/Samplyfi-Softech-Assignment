import './index.css'
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { ImEarth } from "react-icons/im";
const UserCard = (props) => {
    console.log(props.each)
    return (
        <div className='user-main-container' >
            <div className='each-user-card'>
                <div className='avatar-card ' style={{ backgroundColor: props.each.avatarBg }} >
                    <img src={props.each.avatar} alt="avatar" className='user-avatar' />
                </div>
                <div className="user-details">
                    <h1 className="user-name">{props.each.name}</h1>
                    <div className='flex'>
                        <IoCallOutline className='icons' />
                        <h4 className='top-details'>{props.each.phone}</h4>
                    </div>
                    <div className='flex'>
                        <IoLocationOutline className='icons' />
                        <h4 className='top-details'> {props.each.address.city}</h4>
                    </div>
                    <div className='flex'>
                        <CiMail className='icons' />
                        <h4 className='top-details'>{props.each.email}</h4>
                    </div>
                </div>
            </div>
            <div className='hr-container'>
                <hr className='top-bottom-divider' />
            </div>
            <div className='user-bottom-container'>
                <div>
                    <h2 className='address-text'>Company:</h2>
                    <br />
                    <div className='company-text'>
                        <h5 className='company-name'>{props.each.company.name}</h5>
                        <p className='text-para'>{props.each.company.catchPhrase}</p>
                        <p className='text-para'>{props.each.company.bs}</p>
                    </div>
                </div>
                <div>
                    <h2 className='address-text'>Address:</h2>
                    <div className='company-text'>
                        <p className='text-para'> {props.each.address.city} ,</p>
                        <p className='text-para'>{props.each.address.street}, Apt. 556,</p>
                        <p className='text-para'>{props.each.address.zipcode}</p>
                    </div>
                </div>
                <div className='btn-container'>

                    <button className='btn' style={{ backgroundColor: props.each.avatarBg }}> <ImEarth className='globe-icon' />  <p>{props.each.website}</p> </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard