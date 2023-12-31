const UserService = require('../services/user-service');

class UserController {
  async register(req, res) {
    try {
      const newUser = await UserService.addUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const currentUserInfo = await UserService.getUserInfo(req.currentUserId);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updatedUserInfo(
        req.currentUserId,
        req.body,
      );
      res.status(200).json({ updatedUser });
    } catch (error) {
      res
        .status(error.status || 400)
        .json({ success: false, message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      //TODO: 유저삭제시 관련 데이터 지우기
      const result = await UserService.deleteUser(req.currentUserId, req.body);
      res.status(200).json({ success: true });
      //res.status(204).end();
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  async getUserByAdmin(req, res) {
    try {
      const { userId } = req.params;
      const currentUserInfo = await UserService.getUserInfo(userId);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  async updateUserByAdmin(req, res) {
    try {
      const { userId } = req.params;
      const updatedUser = await UserService.updatedUserInfo(userId, req.body);
      res.status(200).json({ updatedUser });
    } catch (error) {
      res
        .status(error.status || 400)
        .json({ success: false, message: error.message });
    }
  }

  async deleteUserByAdmin(req, res) {
    try {
      const { userId } = req.params;
      //TODO: 유저삭제시 관련 데이터 지우기
      await UserService.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }
}
const userController = new UserController();
module.exports = userController;
