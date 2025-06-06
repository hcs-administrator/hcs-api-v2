const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');

const schema2 = buildSchema(`

    type Output {
      message: String
    }

    type NocoStaff {
      id: Int
      firstname: String
      lastname: String
      name: String
      createdat: String
      updatedat: String
      eid: String
      email: String
      approle: String
      devices1: Int
      service_accounts: Int
      issmt: Int
      newthisyear: Int
      dept_order: Int
      order: Int
      role1: String
      role2: String
      networkpassword: String
      macpassword: String
      ipadcode: String
      tumu_pin: String
      tumu_id: Int
      tecom_user_id: Int
      tecom_user_pin: String
      tecom_fob_id: Int
      tecom_fob_number: Int
      fobs: Int
      phonelogin: String
      phoneext: Int
      admin_roles: Int
      mathletics: String
      alarm_areas: Int
      readingeggs: String
      isactive: Int
      hasphoto: Int
      year: Int
      qualifications: String
      admin_rights: Int
      department: String
      googleid: String 
    }

    type NocoStudent {
      id: Int
      firstname: String
      lastname: String
      name: String
      createdat: String
      updatedat: String
      username: String
      email: String
      password: String
      house: String
      dob: String
      gender: String
      yearlevel: Int
      tutorgroup: String
      hasNetworkAccess: String
      firstattendance: String
      studentId: String
      kamar_password_changed: Int
    }

    type VOIPUser {
      id: String,
      accountcode: String,
      name: String,
      displayname: String,
      secret: String,
      emailaddress: String,
      mobilenumber: String,
      callgroup: String,
      billinggroup: String,
      extension: String,
      profile: String,
      pinnumber: String,
      callerid: String,
      primarynumber: String,
      useruniqueid: String,
      role: String
    }

    type PapercutUser {
      name: String
      email: String
      balance: Float
      department: String
      office: String
      internal: String
      total_page: Int
      total_jobs: Int
    }

    type KamarUser {
      id: String
      uuid: String
      role: String
      created: Int
      uniqueid: String
      schoolindex: [Int]
      username: String
      title: String
      firstname: String
      lastname: String
      name: String
      gender: String
      datebirth: Int
      classification: String
      position: String
      house: String
      startingdate: Int
      photocopierid: Int
      email: String
      mobile: String
      extension: Int
      groups: [Group]
    }

    type Group {
      type: String
      name: String
    }

    type Me {
      noco: NocoStaff
      kamar: KamarUser
      papercut: PapercutUser
      voip: VOIPUser
    }

    type Me2 {
      id: String
      uuid: String
      role: String
      created: Int
      uniqueid: String
      schoolindex: [Int]
      title: String
      firstname: String
      lastname: String
      name: String
      gender: String
      datebirth: Int
      classification: String
      position: String
      house: String
      startingdate: Int
      email: String
      mobile: String
      noco: NocoStaff
      voip: VOIPUser
      printing: PapercutUser
      groups: [Group]
    }

    input Data {
      key: String!
      vstring: String
      vnumber: Int
      vdouble: Float
    }
     
    type Query {
      getMe(token: String): Me
      getMe2(token: String): Me2
      getVoipMe(token: String): VOIPUser
      getVoipUser(token: String, user: String): VOIPUser
      getVoipUsers(token: String): [VOIPUser]
      getPapercutMe(token: String): PapercutUser
      getPapercutUser(token: String, user: String): PapercutUser
      getPapercutUsers(token: String): [String]
      getKamarMe(token: String): KamarUser
      getKamarUser(token: String, id: String, fields: [String]): KamarUser
      getKamarUsers(token: String, type: String, fields: [String]): [KamarUser]
      getNocoStaffMe(token: String): NocoStaff
      getNocoStaffSingle(token: String, id: String, fields: [String]): NocoStaff
      getNocoStaffAll(token: String, type: String, fields: [String]): [NocoStaff]
      getNocoStudentMe(token: String): NocoStudent
      getNocoStudent(token: String, id: String, fields: [String]): NocoStudent
      getNocoStudents(token: String, type: String, fields: [String]): [NocoStudent]
    }

    type Mutation {
        addVoipUser(token: String, name: String, displayname: String, password: String, confirm: String, emailaddress: String, extension: String): Output
        deleteVoipUser(token: String, id: String): Output
        addPapercutUser(token: String, username: String, password: String, fullname: String, email: String, card: String, pin: String): Output
        deletePapercutUser(token: String, id: String): Output
        addNocoStaff(token: String) : Output
        addNocoStudent(token: String) : Output
        deleteNocoStaff(token: String) : Output
        deleteNocoStudent(token: String) : Output
        updateNocoStaff(token: String, data: String, eid: String!) : Output
        updateNocoStudent(token: String, Username: String, data: String) : Output
    }

`);

module.exports = { schema2 }

/* 

  getPapercutUsers, returns an array of usernames only - not other properties

*/