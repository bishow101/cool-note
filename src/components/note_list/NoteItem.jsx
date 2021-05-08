import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'


const NoteItem = ({ note, dispatch, setShowEdit, toogleDrawer }) => {
	
	const editNote = () => {
		dispatch({ type: 'EDIT_NOTE', payload: note })
		setShowEdit(true)
	}
	
	return (
		<div onClick={ () => editNote() } className="note-item">
			<div className="top">
				<h3 className="title">{note.title}</h3>
				<IconButton onClick={(e) => toogleDrawer(e, note.id)} color="secondary"> <MoreIcon /> </IconButton>
			</div>
			<p className="detail-text">{note.detail}</p>
		<div className="tags">
			{note.tags.map(tag => <p key={Math.random() } className="tag">{tag}</p> )}
		</div>
	
		</div>
	)
}

export default NoteItem
