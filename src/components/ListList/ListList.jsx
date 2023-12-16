import "./listlist.scss";
import ListListItem from "../ListListItem/ListListItem";
import listdata from "../../data/listdata";

const ListList = () => {
	return (
		<div className="listList">
			<h2>Listed Lists</h2>
			<ul>
				{listdata ? (
					listdata.map((data) => (
						<ListListItem
							key={data._id}
							listtitle={data.title}
							content={data.content}
						/>
					))
				) : (
					<h3>Add some lists to get started!</h3>
				)}
			</ul>
		</div>
	);
};

export default ListList;
