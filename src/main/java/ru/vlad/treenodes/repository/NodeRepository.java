package ru.vlad.treenodes.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.vlad.treenodes.entity.Node;

import java.util.List;

@Repository
public interface NodeRepository extends CrudRepository<Node, Long> {

    List<Node> findByParentIsNull();
}
