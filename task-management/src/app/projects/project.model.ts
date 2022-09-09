export class Project {
    public id: number;
    public name: string;
    public status: string;
    public startDate: string;
    public endDate: string;
    public projectManager: string;
    public teamMembers: string[];
    public description: string;

    constructor(
        id: number,
        name: string,
        status: string,
        startDate: string,
        endDate: string,
        projectManager: string,
        teamMembers: string[],
        description: string,
    ) {
        this.id = id;
        this.name = name
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectManager = projectManager;
        this.teamMembers = teamMembers;
        this.description = description;
    }
}

