import AddList from "../../components/AddList/AddList";
import ListList from "../../components/ListList/ListList";
import "./list.scss";

const List = () => {
	return (
		<div className="pageContainer">
			<ListList />
			<AddList />
		</div>
	);
};

export default List;
