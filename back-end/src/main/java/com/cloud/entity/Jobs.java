package com.cloud.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Jobs {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid",strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    private UUID jobId;
    private String jobRole;
    private Integer noOfOpenings;
    private double minimumPercentage;
    private  Integer requiredPassedOutYear;
    @ElementCollection
    @CollectionTable(name = "reqskills", joinColumns = @JoinColumn(name = "jobId"))
    @Column(name = "skill")
    private Set<String> reqskills = new HashSet<>();
    private Boolean isJobDeleted=false;

    @ElementCollection
    @CollectionTable(name = "requiredGraduation", joinColumns = @JoinColumn(name = "jobId"))
    @Column(name = "graduation")
    private Set<String> requiredGraduation = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "jobs")
    private List<Applications> application;

    @ManyToOne
    private Companies companies;
}
