import apiUtils from "./apiUtils"

export const createProject = async (projectData)=> {
    try {
        const response =await apiUtils.create('/v1/projects', projectData);
    return response 
 }catch(error){
    console.log('Error creating project', error);
    return error;
 }
}

export const getProjects = async () => {
    try {
      const response = await apiUtils.read('/v1/projects');
      return response;
    } catch (error) {
      console.error('Error getting projects:', error);
      return error;
    }
  };

export const putProject = async (id, name,description) => {
    try {
        const response = await apiUtils.update(`/v1/projects/${id}`,{name,description});
        return response; 
    }catch(error) {
        console.error('Error updatting project', error);
        return error;
    }
}

export const deleteProject = async (id)=>{
    try {
        const response = await apiUtils.del(`/v1/projects/${id}`);
        return response;
    }catch(error){
        console.error('Error deleting project', error);
        return error;
    }
}

export const getProjectStructure = async (projectId) => {
    try {
      const response = await apiUtils.read(`/v1/projects/${projectId}`);
      return response;
    } catch (error) {
      console.error('Error getting project structure:', error);
      return error;
    }
  };