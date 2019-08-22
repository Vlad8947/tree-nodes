package ru.vlad.treenodes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.vlad.treenodes.entity.Node;
import ru.vlad.treenodes.repository.NodeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NodeService {

    @Autowired
    private NodeRepository nodeRepository;

    public NodeService() {
    }

    public void save(Node node) {
        nodeRepository.save(node);
    }

    public List<Node> getRoot() {
         return nodeRepository.findByParentIsNull();
    }

    public Node get(long id) {
        Optional optional = nodeRepository.findById(id);
        if (optional.isPresent()) {
            return (Node) optional.get();
        }
        return null;
    }

    public List<Node> getChildren(long id) {
        return get(id).getChildren();
    }

    public void delete(long id) {
        nodeRepository.deleteById(id);
    }

    public void clear() {
        nodeRepository.deleteAll();
    }

}
