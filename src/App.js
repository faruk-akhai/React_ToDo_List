import { useEffect, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineSecurityUpdateGood } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import { Button } from './Component/Button'
import {Input} from './Component/Input'
import { FcTodoList } from 'react-icons/fc'
export default function App() {
	const [data, setData] = useState([])
	const [input, setInput] = useState('')
	const [edit, setEdit] = useState(false)
	const [id, setId] = useState(0)
	const [search, setSearch] = useState([])
	const [string, setString] = useState('')
	let icon = { paddingtop: '50px' }
	useEffect(() => {
		if (string == '') setSearch(data)
	}, [data, string])
	const handleAdd = () => {
		let isExist = false
		if (input == '') {
			alert('Please Enter Value to proceed further.')
			return
		}
		data.map((item) => {
			if (item.name === input) {
				isExist = true
				alert('These Todo Already exist in list so not adding it.')
				return
			}
		})
		if (isExist) {
			setInput('')
			return
		}

		if (data.length == 0) {
			setData([...data, { name: input, id: 1 }])
		} else {
			setData([
				...data,
				{ name: input, id: data[data.length - 1].id + 1 }
			])
		}
		setString('')
		setInput('')
	}
	const handleDelete = (i) => {
		setSearch(search.filter((item) => item.id != i))
		setData(data.filter((item) => item.id != i))
		if (search.length == 1) {
			setString('')
			handleSearch('')
		}
	}
	const handleEdit = (item, i) => {
		setInput(item.name)
		setEdit(true)
		setId(i)
	}
	const handleUpdate = () => {
		let isCancel = false
		data.map((item, index) => {
			if (item.id === id) {
				if (item.name == input) {
					if (
						!window.confirm(
							"you haven't update values are you sure you want to proceed further"
						)
					)
						isCancel = true
				}
				if (!isCancel) {
					item.name = input
					setData([...data])
				}
			}
		})
		if (isCancel) return
		setEdit(false)
		setInput('')
	}
	const handleSearch = (val) => {
		setEdit(false)
		setInput('')
		setId(id)
		if (val.trim() !== '')
			setSearch(
				data.filter((item) =>
					item.name.toLowerCase().includes(val.toLowerCase())
				)
			)
		else setSearch(data)
	}
	const handleRemove = () => {
		if (string === '') {
			setData([])
			alert('All Todos are Removed Succesfully')
		} else {
			setData(
				data.filter((item) => {
					for (let i = 0; i < search.length; i++) {
						let id = search[i].id
						if (item.id == search[i].id) return
					}
					return item
				})
			)
			setSearch([])
			alert('All Searched Todos are Removed Succesfully')
			setString('')
		}
	}
	return (
		<>
			<div id="container">
				<div id="cn">
					<h1>Todo List</h1>
					<span>
						<FcTodoList />
					</span>
				</div>
				{data.length > 0 ? (
					<Input
						id="search"
						plh="Search your todo"
						val={string}
						oncha={(e) => (
							handleSearch(e.target.value),
							setString(e.target.value)
						)}
					/>
				) : null}
				<div id="containermain">
					<div id="containerInput">
						<Input
							plh="Enter your todo"
							val={input}
							oncha={(e) => setInput(e.target.value)}
						/>
						{edit ? (
							<>
								<Button
									onCli={handleUpdate}
									id="btn3"
									icon={<MdOutlineSecurityUpdateGood />}
								/>
								<Button
									onCli={() => (setInput(''), setEdit(false))}
									id="btn1"
									icon={<MdCancel />}
								/>
							</>
						) : (
							<Button
								onCli={handleAdd}
								id="btn3"
								icon={<IoMdAddCircle />}
							/>
						)}
					</div>
				</div>
				{search.map((item) => (
					<h3>
						{item.name}
						<div>
							<Button
								onCli={() => handleDelete(item.id)}
								id="btn1"
								icon={<MdDelete />}
							/>
							<Button
								onCli={() => handleEdit(item, item.id)}
								id="btn2"
								icon={<FaEdit />}
							/>
						</div>
					</h3>
				))}
				{search.length > 1 ? (
					<Button
						onCli={handleRemove}
						id="btn"
						icon={'Remove All Todos'}
					/>
				) : null}
			</div>
		</>
	)
}