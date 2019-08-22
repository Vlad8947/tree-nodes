package ru.vlad.treenodes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="nodes")
@Getter@Setter
public class Node {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String label;

    @ManyToOne
    @JoinColumn(name="parent_id")
    private Node parent;
    @OneToMany(mappedBy = "parent")
    private List<Node> children;


    public Node() {
    }
}
