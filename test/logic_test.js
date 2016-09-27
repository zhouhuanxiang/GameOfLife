describe("Logic.resize", function(){
  it("should be a function", function(){
    var logic = new Logic();
    logic.initialize(1,1);
    logic.randomize();
    assert.isFunction(logic.resize);
  });
  it("should have zero argument", function(){
    var logic = new Logic();
    logic.initialize(1,1);
    logic.randomize();
    assert.equal(logic.resize.length, 0);
  });
  it("should expand when there are live cell in the border---test 1", function(){
    var logic = new Logic();
    logic.initialize(2,2);
    logic.setLogicMap([[0,0,0,0],
                       [1,1,0,0],
                       [0,1,1,0],
                       [0,1,1,0]]);
    assert.sameDeepMembers(logic.resize(), [1,0,0,1]);
  });
  it("should expand when there are live cell in the border---test 2", function(){
    var logic = new Logic();
    logic.initialize(3,3);
    logic.setLogicMap([[1,0,1,0,0],
                       [1,1,0,0,0],
                       [1,0,1,0,0],
                       [0,0,0,1,0],
                       [0,0,0,1,0]]);
    assert.sameDeepMembers(logic.resize(), [1,0,1,0]);
  });
});

describe("Logic.nextRound", function(){
  it("should be a function", function(){
    var logic = new Logic();
    logic.initialize(1,1);
    logic.randomize();
    assert.isFunction(logic.nextRound);
  });
  it("should have zero argument", function(){
    var logic = new Logic();
    logic.initialize(1,1);
    logic.randomize();
    assert.equal(logic.nextRound.length, 0);
  });
  it("should correctly calculate cells' status of next round---test 1", function(){
    var logic = new Logic();
    logic.initialize(2,2);
    logic.setLogicMap([[0,0,0,0],
                       [1,1,0,0],
                       [0,1,1,0],
                       [0,1,1,0]]);
    assert.sameDeepMembers(logic.nextRound(), [[0,0,0,0],[1,1,1,0],
                                                  [0,0,0,0],[0,1,1,0]]);

  });
  it("should correctly calculate cells' status of next round---test 2", function(){
    var logic = new Logic();
    logic.initialize(3,3);
    logic.setLogicMap([[0,0,1,0,0],
                       [1,1,0,0,0],
                       [1,0,1,0,0],
                       [0,0,0,1,0],
                       [0,0,0,1,0]]);
    assert.sameDeepMembers(logic.nextRound(), [[0,1,0,0,0],[1,0,1,0,0],[1,0,1,0,0],
                                              [0,0,1,1,0],[0,0,0,0,0]]);
  });
});
