const Manager = require("../app");

describe("getUserInput", () => {
  describe("try", () => {
    it("should enter all information of manager", () => {
      const manager = new Manager("Thanh", 0, "510thanh.ngo@gmail.com", 100);
      expect(manager).toEqual(true);
    });
    it("Manager class should be extends from employee", () => {
      
    });
  });

});
