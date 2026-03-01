
import axios from 'axios';

const checkCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/categories');
    console.log(JSON.stringify(response.data.data, null, 2));
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

checkCategories();
