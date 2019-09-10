package ru.vlad.treenodes.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="nodes")
@Data
public class Node {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String key;
    private String label;
    private Long parentId;
    @OneToMany(mappedBy = "parentId", cascade = CascadeType.ALL)
    private List<Node> children;

}
