## Entities
Entity Name | Description | Relationships
------------ | ----------- | --------------
Users | Users of the platform |Belong to teams, Have reviews, Have Tasks
Teams | Collections of Users | Have users, Have objectives
Reviews | Comments about a User | Belong to users
Objectives | High level goal for a team | Belong to teams
Comments| Comments about any entity | Belong to <Entity Name>
Tasks | Specific actions for a user | Belong to users, Are related to Objectives

[Return to StratPlanner Home](../README.md)