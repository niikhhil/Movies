import { useState } from "react"
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenresQuery, useUpdateGenreMutation } from "../../redux/api/genre"


const GenreList = () => {

    const { data: genres, refetch } = useFetchGenresQuery()
    const [name, setName] = useState('')
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [ createGenre ] = useCreateGenreMutation()
    const [ updateGenre ] = useUpdateGenreMutation()
    const [ deleteGenre ] = useDeleteGenreMutation()

  return (
    <div className="ml-40 flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
            <h1 className="h-12 ">Manage Genres</h1>
        </div>
    </div>
  )
}
export default GenreList