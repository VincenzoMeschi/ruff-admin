import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./user.scss";

const User = () => {
	return (<div className="pageContainer">
		< UserList />
		< AddUser />
	</div>);
};

export default User;
