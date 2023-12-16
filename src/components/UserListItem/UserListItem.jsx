import "./userlistitem.scss";

const UserListItem = ({ img, username }) => {

	return (
		<li className="userListItem">
			<img src={img} alt="" />
			<h3>{username}</h3>
			<div className="modifyButtons">
				<button className="edit">Edit</button>
				<button className="delete">Delete</button>
			</div>
		</li>
	);
};

export default UserListItem;
