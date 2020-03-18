const Employee = require("../app");
const Manager = require("../app");

describe("Employee", () => {
    it("should have basic layout for employee", () => {
      const employee = new Employee("Thanh", 0, "510thanh.ngo@gmail.com");

      expect(employee.name).toEqual("Thanh");
      expect(employee.id).toEqual(0);
      expect(employee.email).toEqual("510thanh.ngo@gmail.com");
    });
})
describe("Manager", () => {
    it("Manager should be extends Employee but overide with it's own value & function", () => {
      // Arrange & Act
      const employee = new Employee("Thanh", 0, "510thanh.ngo@gmail.com");
      const manager = new Manager("Thanh", 0, "510thanh.ngo@gmail.com", 100);

      // Assert
      expect(manager.name).toEqual(employee.name);
      expect(manager.id).toEqual(employee.id);
      expect(manager.email).toEqual(employee.email);
      expect(manager.officeNumber).toEqual(100);
      expect(manager.getRole()).toEqual("Manager");
    });
});
