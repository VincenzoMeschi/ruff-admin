import "./userlistitem.scss";

const UserListItem = (props) => {
	const handleEdit = () => {
		props.setShowEdit(true);
		props.setEditedUser(props.id);
		props.setReady(true)
	};

	const handleDelete = () => {
		props.onUserDelete(props.id);
		props.setDeletedUser(props.id);
	};

	return (
		<li className="userListItem">
			<img src={props.img} alt="" />
			<h3>{props.username}</h3>
			<div className="modifyButtons">
				<button className="edit" onClick={handleEdit}>
					Edit
				</button>
				<button onClick={handleDelete} className="delete">
					Delete
				</button>
			</div>
		</li>
	);
};

export default UserListItem;
