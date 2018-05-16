export default class HttpService{

  constructor(param){
    this.instance = null;
    if(!param){
      throw Error("Illegal Constructor call!");
    }

    this.data = {};
    this.data.users = [
      {id: 1, name: "Tibike"},
      {id: 2, name: "Robika"},
      {id: 3, name: "Tiborka"},
      {id: 4, name: "Imike"}
    ];

    this.data.messages = {
      "1":{
        user:"Tibike",
        messages:[
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:1,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", time:"2018.05.14 10:00:00"}
        ].reverse()
      },
      "2":{
        user:"Robika",
        messages:[
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"}
        ]
      },
      "3":{
        user:"Imike",
        messages:[
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"}
        ]
      },
      "4":{
        user:"Tibike2",
        messages:[
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:1,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"},
          {receive:0,txt:"Lorem ipsum dolor sit amet", time:"2018.05.14 10:00:00"}
          ]
      }
    }
  }

  getUsers(){
    return this.data.users;
  }

  getMessages(userId) {
    if(this.data.messages[userId]){
      return this.data.messages[userId];
    }else{
      return {
        user:"",
        messages:[]
      }
    }

  }


  sendMessage(userId,txt){

  }

  static instance(){
    if(!HttpService.inst){
      HttpService.inst = new HttpService(true);
    }
    return HttpService.inst;
  }
}

