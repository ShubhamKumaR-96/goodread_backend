import logger from "../config/logger.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      logger.error("Something went wrong on crud repo", error);
    }
  };

  destroy = async (id) => {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong on crud repo");
      throw error;
    }
  };

  get = async (id) => {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong on crud repo");
      throw error;
    }
  };
  getALL = async () => {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong on crud repo");
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong on crud repo");
      throw error;
    }
  };
}

export default CrudRepository
