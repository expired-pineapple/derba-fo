import axios from '@axios'


async function fetchData(commit, url, successMutation, errorMutation) {
  try {
    commit('isLoading', true)

    const response = await axios.get(url)

    commit(successMutation, response.data)
  } catch (error) {
    console.log(error)
    commit(errorMutation, error.response.data.message)
  } finally {
    commit('isLoading', false)
  }
}

async function createData(commit, url, successMutation, errorMutation) {
  try {
    commit('isLoading', true)
    
    const response = await axios.post(url)
    
    commit(successMutation, response.data)
  }
  catch (error) {
    console.log(error)
    commit(errorMutation, error.response.data.message)
  }
  finally {
    commit('isLoading', false)
  }
}
   
async function updateData(commit, url, successMutation, errorMutation) {
  try {
    commit('isLoading', true)
        
    const response = await axios.put(url)
        
    commit(successMutation, response.data)
  }
  catch (error) {
    console.log(error)
    commit(errorMutation, error.response.data.message)
  }
  finally {
    commit('isLoading', false)
  }
}

async function deleteData(commit, url, successMutation, errorMutation) {
  try {
    commit('isLoading', true)
                
    const response = await axios.delete(url)
                
    commit(successMutation, response.data)
  }
  catch (error) {
    console.log(error)
    commit(errorMutation, error.response.data.message)
  }
  finally {
    commit('isLoading', false)
  }
}

export {
  createData, deleteData, fetchData, updateData,
}

