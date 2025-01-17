import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`)
    console.log(res.data);

    if (res.data) {
      setList(res.data.data)
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (foodId) => {
    try {
        const res = await axios.delete(`${url}/api/food/remove/${foodId}`); 
         if (res.data) {
            toast.success(res.data.msg);
            await fetchList();
        } else {
            toast.error("Error while removing food");
        }
    } catch (error) {
        toast.error("Error while removing food");
    }
};


  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List